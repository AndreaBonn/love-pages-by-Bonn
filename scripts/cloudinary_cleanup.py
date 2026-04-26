"""Remove Cloudinary images older than a configurable number of days.

Requires env vars: CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET.
Optional: CLOUDINARY_MAX_AGE_DAYS (default 30), CLOUDINARY_DRY_RUN (default false).
"""

import json
import os
import sys
import urllib.error
import urllib.parse
import urllib.request
from base64 import b64encode
from datetime import datetime, timezone


def get_config() -> dict:
    cloud_name = os.environ.get("CLOUDINARY_CLOUD_NAME", "")
    api_key = os.environ.get("CLOUDINARY_API_KEY", "")
    api_secret = os.environ.get("CLOUDINARY_API_SECRET", "")

    if not all([cloud_name, api_key, api_secret]):
        print("ERROR: missing CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, or CLOUDINARY_API_SECRET")
        sys.exit(1)

    max_age_days = int(os.environ.get("CLOUDINARY_MAX_AGE_DAYS", "30"))
    if max_age_days < 1:
        print(f"ERROR: CLOUDINARY_MAX_AGE_DAYS must be >= 1, got {max_age_days}")
        sys.exit(1)

    return {
        "cloud_name": cloud_name,
        "api_key": api_key,
        "api_secret": api_secret,
        "max_age_days": max_age_days,
        "dry_run": os.environ.get("CLOUDINARY_DRY_RUN", "false").lower() == "true",
    }


def auth_header(api_key: str, api_secret: str) -> str:
    credentials = b64encode(f"{api_key}:{api_secret}".encode()).decode()
    return f"Basic {credentials}"


def api_request(url: str, cfg: dict, method: str = "GET", data: bytes | None = None) -> dict:
    headers = {
        "Authorization": auth_header(cfg["api_key"], cfg["api_secret"]),
        "Content-Type": "application/json",
    }
    req = urllib.request.Request(url, headers=headers, method=method, data=data)
    with urllib.request.urlopen(req) as resp:
        return json.loads(resp.read().decode())


def list_resources(cfg: dict, next_cursor: str | None = None) -> dict:
    base = f"https://api.cloudinary.com/v1_1/{cfg['cloud_name']}/resources/image/upload"
    params = {"max_results": "500"}
    if next_cursor:
        params["next_cursor"] = next_cursor
    url = f"{base}?{urllib.parse.urlencode(params)}"
    return api_request(url, cfg)


def delete_resources(cfg: dict, public_ids: list[str]) -> dict:
    url = f"https://api.cloudinary.com/v1_1/{cfg['cloud_name']}/resources/image/upload"
    payload = json.dumps({"public_ids": public_ids}).encode()
    return api_request(url, cfg, method="DELETE", data=payload)


def main() -> None:
    cfg = get_config()
    now = datetime.now(tz=timezone.utc)
    max_age_days = cfg["max_age_days"]
    dry_run = cfg["dry_run"]

    print(f"Cloudinary cleanup: removing images older than {max_age_days} days")
    if dry_run:
        print("DRY RUN — no images will be deleted")

    to_delete: list[str] = []
    next_cursor: str | None = None
    total_checked = 0

    while True:
        result = list_resources(cfg, next_cursor=next_cursor)
        resources = result.get("resources", [])

        for r in resources:
            total_checked += 1
            created = datetime.fromisoformat(r["created_at"].replace("Z", "+00:00"))
            age_days = (now - created).days
            if age_days > max_age_days:
                to_delete.append(r["public_id"])
                print(f"  expired: {r['public_id']} ({age_days} days old)")

        next_cursor = result.get("next_cursor")
        if not next_cursor:
            break

    print(f"\nChecked {total_checked} images, {len(to_delete)} expired")

    if not to_delete:
        print("Nothing to delete.")
        return

    if dry_run:
        print(f"DRY RUN: would delete {len(to_delete)} images")
        return

    # Cloudinary delete API accepts max 100 public_ids per request
    deleted = 0
    for i in range(0, len(to_delete), 100):
        batch = to_delete[i : i + 100]
        try:
            result = delete_resources(cfg, batch)
            batch_deleted = sum(1 for v in result.get("deleted", {}).values() if v == "deleted")
            deleted += batch_deleted
            print(f"  batch {i // 100 + 1}: deleted {batch_deleted}/{len(batch)}")
        except urllib.error.HTTPError as e:
            print(f"  batch {i // 100 + 1}: ERROR {e.code} — {e.read().decode()}")

    print(f"\nDone. Deleted {deleted}/{len(to_delete)} images.")


if __name__ == "__main__":
    main()
