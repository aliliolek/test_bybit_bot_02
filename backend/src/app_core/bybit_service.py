"""Wrapper around the `bybit_p2p` client."""

from __future__ import annotations

from typing import Dict, Optional

try:
    from bybit_p2p import P2P as _BybitClient
except Exception as exc:  # pragma: no cover - library provided at runtime
    _BybitClient = None
    _IMPORT_ERROR = exc


class BybitP2PClient:
    """Thin wrapper for validating Bybit P2P API keys."""

    def __init__(self, api_key: str, api_secret: str, testnet: bool = False) -> None:
        if _BybitClient is None:  # pragma: no cover - import failure
            raise RuntimeError("bybit_p2p library is not available") from _IMPORT_ERROR
        self._client = _BybitClient(api_key=api_key, api_secret=api_secret, testnet=testnet)

    def probe(self) -> tuple[bool, Optional[Dict[str, str]]]:
        """Perform a harmless API call to verify credentials."""
        try:
            # A simple read-only call; the actual method may differ in the real client.
            self._client.get_account_information()
            return True, None
        except Exception as exc:  # pragma: no cover - network/SDK errors
            error_code = getattr(exc, "code", "UNKNOWN")
            return False, {"error_code": str(error_code), "message": str(exc)}
