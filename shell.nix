with import <nixpkgs> {};

{ prod ? false }:

let
	fenix = import (fetchTarball "https://github.com/nix-community/fenix/archive/main.tar.gz") { };
in

mkShell {
	packages = [
		python3
		python3Packages.pip
		virtualenv
		gnused

		nodejs
		nodePackages.pnpm

		codespell
		nodePackages.prettier
		black

		tmux
		
		(with fenix; with latest; combine [
			minimal.toolchain
			targets.wasm32-unknown-unknown.latest.rust-std
		])
	];

	shellHook = ''
		export SHELL=zsh
		export PS1="[1mBonk Corporation[0m %% "
		export "PATH=venv/bin/:$PATH"
		export PIP_DISABLE_PIP_VERSION_CHECK=1
		export NIX_IGNORE_SYMLINK_STORE=1
		export NIX_ENFORCE_PURITY=0

		cargo install wasm-pack

		yes | pnpm install --reporter=silent
		yes | pnpm install -C frontend --reporter=silent

		make venv >/dev/null
		${if prod then
			''
				sed -i '1s|.*|#!/app/venv/bin/python3|' venv/bin/pip3
			''
		  else
			''
				sed -i "1s|.*|#!$PWD/venv/bin/python3|" venv/bin/pip3
			''
		}
		source venv/bin/activate

		pip3 install -r requirements.txt --break-system-packages --quiet

		${if prod then
			''
				pnpm -C frontend build
				python3 backend/manage.py migrate bonk
				python3 backend/manage.py migrate
			''
		  else
			''
				tmux new-session -d 'trap : INT; make || $SHELL'
				tmux set -g mouse on # neat
				tmux split-window -h 'trap : INT; make fdev || $SHELL'
				tmux split-window '$SHELL'
				exec tmux attach
			''
		 }
	'';
}
