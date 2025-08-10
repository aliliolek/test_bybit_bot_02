"""Command-line interface for backend utilities."""

from __future__ import annotations

import argparse
import json
import sys
from typing import Optional, List

from .bybit_service import BybitP2PClient


def _str_to_bool(value: str) -> bool:
    """Parse string to boolean."""
    return value.lower() in {"true", "1", "t", "y", "yes"}


def validate_bybit_keys(args: argparse.Namespace) -> int:
    """Validate provided Bybit API keys."""
    try:
        client = BybitP2PClient(api_key=args.key, api_secret=args.secret, testnet=args.testnet)
        ok, error = client.probe()
    except Exception as exc:  # pragma: no cover - external library errors
        payload = {"status": "FAIL", "error_code": "", "message": str(exc)}
        print(json.dumps(payload))
        return 1
    if ok:
        print(json.dumps({"status": "OK"}))
        return 0
    payload = {
        "status": "FAIL",
        "error_code": error.get("error_code") if error else "",
        "message": error.get("message") if error else "",
    }
    print(json.dumps(payload))
    return 1


def main(argv: Optional[List[str]] = None) -> int:
    """CLI entry point."""
    parser = argparse.ArgumentParser(description="Backend CLI")
    sub = parser.add_subparsers(dest="command", required=True)

    val_parser = sub.add_parser("validate_bybit_keys")
    val_parser.add_argument("--key", required=True)
    val_parser.add_argument("--secret", required=True)
    val_parser.add_argument("--testnet", type=_str_to_bool, default=False)
    val_parser.set_defaults(func=validate_bybit_keys)

    args = parser.parse_args(argv)
    return args.func(args)


if __name__ == "__main__":  # pragma: no cover
    sys.exit(main())
