# Backend

## Requirements
- Python 3.11+

## Setup

```bash
cd backend
poetry install
```

## Run CLI

```bash
python -m app_core.cli validate_bybit_keys --key XXXXX --secret YYYYY --testnet true
```

### Expected Output

On success:

```json
{"status":"OK"}
```

On failure:

```json
{"status":"FAIL","error_code":"<code_if_any>","message":"<short_reason>"}
```

Exit code is `0` on success and `1` on failure.
