# Project Setup

This guide helps you set up the project environment,
install dependencies and build the documentation and assets.

## Linux Arch dependencies
```
sudo pacman -S python
sudo pacman -S npm
```

## Python Environment
```
python -m venv .venv
source .venv/bin/activate.fish
pip install --upgrade pip
pip install -r requirements.txt
```

## Javascript Environment
```
cd js-three
npm install
npm run build  # runs packages.json, which includes vite.config.js
# npx vite build  # runs vite.config.js
cd ..
```

## Render HTML
Start live session: `mkdocs serve` \
Build static website: `mkdocs build`
