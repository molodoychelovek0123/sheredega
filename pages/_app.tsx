import "@/public/fonts/stylesheet.css";
import "../styles.scss";
import { DevSupport } from "@react-buddy/ide-toolbox-next";
import { ComponentPreviews, useInitial } from "@/dev";


// Осторожно. Весь проект трижды переваренный кал. Никому не советую здесь разбираться
// Где проебали типизацию, там можете даже не искать
// Если что-то развалилось и вы попали сюда, значит вам очень плохо.
// Спасибо за понимание.

const App = ({ Component, pageProps }: any) => {
  return (
    <>
      <Component {...pageProps} />
      <script src="https://flackr.github.io/scroll-timeline/dist/scroll-timeline.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/web-animations/2.3.2/web-animations.min.js"></script>
      <script src="/utils/scrollpolyfill.js"></script>
    </>
  );
};

export default App;