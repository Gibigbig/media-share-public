# Media share for your twitch audience

Using websockets and react and localstorage. Plays youtube videos without needing to refresh or interact with browser. Videos are added instantly from your twitch chat. Pretty cool little thing to have fun with your small to moderate community.


![image](https://github.com/Gibigbig/media-share-public/assets/24195190/81dfe12c-1d21-4005-8c86-21349c1524b7)

# Features

- Integrated twitch chat
- See the user who uploaded the video at the bottom
- Skip video if too long or annoying or TOS
- Suports youtube only currently
- Instant video sharing to stream to your community once they post a youtube link in chat. 



# Known issues

- Occacionally will get a cannot access .video of null error. Will sort eventually.
- Twitch chat blocks you from typing in it in the window because it detects that its being "obscured" whatever that means. Im literally using their own embed code. nerd.
- Uses localStorage at the moment, therefore not able for twitch mods to screen videos before hand. Trolls can post 
- browsers need you to interact with the page first before autoplay works. talk about shooting yourself in the foot. 


