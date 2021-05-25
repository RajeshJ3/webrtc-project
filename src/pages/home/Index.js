import { Hidden } from "@material-ui/core";
import Desktop from "./Desktop";
import Mobile from "./Mobile";

export default function Index() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  function generateString(length) {
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  return (
    <>
      <Hidden smDown>
        <Desktop code={generateString(8)} />
      </Hidden>
      <Hidden mdUp>
        <Mobile code={generateString(8)} />
      </Hidden>
    </>
  );
}
