import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* Ładowanie biblioteki Google Maps JavaScript */}
          <script src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyD75EWmDGLt6lq4KlZmniElKohX5GSIXjA&libraries=places`} async defer></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
