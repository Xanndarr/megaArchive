import Document, { Head, Main, NextScript } from 'next/document';
import styleSheet from 'styled-components/lib/models/StyleSheet';
import { injectGlobal } from 'styled-components';
import { media } from '../style';

injectGlobal`
  @font-face {
    font-family: ProximaNovaRegular;
    src: url(/static/font/ProximaNovaRegular.otf);
    font-weight: normal;
  }

  @font-face {
    font-family: ProximaNovaBold;
    src: url(/static/font/ProximaNovaSemibold.otf);
    font-weight: bold;
  }

  body {
    font-family: ProximaNovaRegular;
    text-transform: uppercase;
    background-color: #f7f7f7;
    color: #B31B1B;
    margin: 0;
  }
`;

export default class MyDocument extends Document {
  static async getInitialProps({ renderPage }) {
    const page = renderPage();
    const styles = (
      <style
        dangerouslySetInnerHTML={{
          __html: styleSheet.rules().map(rule => rule.cssText).join('\n'),
        }}
      />
    );
    return { ...page, styles };
  }

  render() {
    return (
      <html>
        <Head>
          <title>/m/mega</title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
