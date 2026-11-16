.PHONY: run
SHELL := /bin/bash


#- —— 🧰 Makefile ——————————————————————————————————————
help: #- Outputs this help screen
	@grep -hE '(^[a-zA-Z0-9_-]+:.*?#-.*$$)|(^#-)' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?#- "}{printf "\033[32m%-25s\033[0m %s\n", $$1, $$2}' | sed -e 's/\[32m#-/[33m/'

#- —— ⚙️ Run ———————————————————————————————————————————
run: #- Run the project locally
	python3 -m http.server 8080
