import "@/public/fonts/stylesheet.css"
import "../styles.scss";


const App = ({ Component, pageProps }) => {
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
