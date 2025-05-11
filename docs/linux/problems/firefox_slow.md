# Linux Manjaro – Firefox/Thunderbird starts very slowly

Firefox and Thunderbird are starting extrem slowly (~20s), 
since the latest (~June 2023) updates on my manjaro cinnamon installation. 
After some investigation I found the cause. Uninstall the optional dependency 
xdg-desktop-portal-gnome

``` bash
sudo pacman -R xdg-desktop-portal-gnome
```