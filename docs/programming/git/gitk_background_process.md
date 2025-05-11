# Open gitk in background and show all refs/branches/tags/...

The following bash script will open `gitk` as background process (`gitk &`), 
to not block the shell. Furthermore it allows you to set some [options via 
commandline](https://git-scm.com/docs/gitk), e.g.: `--all` to show all references, branches, tags, ... 
or to refresh the git index before launching gitk to prevent the message 
**"Local uncommitted changes, not checked in to index"** in gitk.

## Linux / WSL
Create file `/usr/local/bin/gitk` with the following content:

``` bash title="/usr/local/bin/gitk"
#!/usr/bin/env bash

# Sometimes gitk shows the message...
# "Local uncommitted changes, not checked in to index"
# ...especially under WSL. But the listed files have no changes.
# A git update-index helps in this case.
git update-index --refresh

# start gitk in background
nohup /usr/bin/gitk --all >/dev/null 2>&1 &
```

Make it executable: `sudo chmod a+rx /usr/local/bin/gitk`


## Windows (Git for Windows)
Open a git bash as administrator (admin permissions are needed to get write 
access in the Windows path of the GIT installation). Create path 
`mkdir -p /usr/local/bin` , add this path ontop of `$PATH` by creating the following 
profile script `nano /etc/profile.d/local_bin.sh` with content:

``` bash title="/etc/profile.d/local_bin.sh"
# remove entry for /usr/local/bin
PATH=$(echo $PATH | tr ":" "\n" | grep -v "/usr/local/bin" | tr "\n" ":")

# Add /usr/local/bin directory as first in PATH variable
export PATH="/usr/local/bin:$PATH"
```

Create file `/usr/local/bin/gitk` with the following content:

``` bash title="/usr/local/bin/gitk"
#!/usr/bin/env bash

# Sometimes gitk shows the message...
# "Local uncommitted changes, not checked in to index"
# ...especially under WSL. But the listed files have no changes.
# A git update-index helps in this case.
git update-index --refresh

# start gitk in background
nohup /mingw64/bin/gitk --all >/dev/null 2>&1 &
```
Make it executable: `sudo chmod a+rx /usr/local/bin/gitk`