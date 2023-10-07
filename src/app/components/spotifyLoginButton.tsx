import { IconBrandSpotify } from "@tabler/icons-react";
import { createButton } from "react-social-login-buttons";

const config = {
  text: "Log in with Spotify",
  icon: IconBrandSpotify,
  iconColor: "#1db954",
  style: { background: "#121212" },
};

const SpotifyLoginButton = createButton(config);
export default SpotifyLoginButton;
