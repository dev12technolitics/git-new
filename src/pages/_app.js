// i18n
import '../locales/i18n';

// highlight
import '../utils/highlight';

// scroll bar
import 'simplebar/src/simplebar.css';

// lightbox
import 'react-image-lightbox/style.css';

// map
import 'mapbox-gl/dist/mapbox-gl.css';
import '../utils/mapboxgl';

// slick-carousel
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

// lazy image
import 'react-lazy-load-image-component/src/effects/black-and-white.css';
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'react-lazy-load-image-component/src/effects/opacity.css';

// fullcalendar
import '@fullcalendar/common/main.min.css';
import '@fullcalendar/daygrid/main.min.css';
import cookie from 'cookie';
import PropTypes from 'prop-types';
import 'react-quill/dist/quill.snow.css';
import '../style.css';
// next
import App from 'next/app';
import Head from 'next/head';
//
import { Provider as ReduxProvider } from 'react-redux';
// @mui
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// redux
import { store } from '../redux/store';
// utils
import { getSettings } from '../utils/getSettings';
// contexts
import { CollapseDrawerProvider } from '../contexts/CollapseDrawerContext';
import { SettingsProvider } from '../contexts/SettingsContext';
// theme
import ThemeProvider from '../theme';
// components
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MotionLazyContainer from '../components/animate/MotionLazyContainer';
import { ChartStyle } from '../components/chart';
import NotistackProvider from '../components/NotistackProvider';
import ProgressBar from '../components/ProgressBar';
import ThemeSettings from '../components/settings';
import { AuthProvider } from '../contexts/JWTContext';


MyApp.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.object,
  settings: PropTypes.object,
};

export default function MyApp(props) {
  const { Component, pageProps, settings } = props;

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <AuthProvider>
        <ReduxProvider store={store}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <CollapseDrawerProvider>
              <SettingsProvider defaultSettings={settings}>
                <MotionLazyContainer>
                  <ThemeProvider>
                    <ThemeSettings>
                      <NotistackProvider>
                        <ChartStyle />
                        <ProgressBar />
                        <ToastContainer />
                        {getLayout(<Component {...pageProps} />)}
                      </NotistackProvider>
                    </ThemeSettings>
                  </ThemeProvider>
                </MotionLazyContainer>
              </SettingsProvider>
            </CollapseDrawerProvider>
          </LocalizationProvider>
        </ReduxProvider>
      </AuthProvider>
    </>
  );
}

// ----------------------------------------------------------------------

MyApp.getInitialProps = async (context) => {
  const appProps = await App.getInitialProps(context);

  const cookies = cookie.parse(context.ctx.req ? context.ctx.req.headers.cookie || '' : document.cookie);

  const settings = getSettings(cookies);

  return {
    ...appProps,
    settings,
  };
};
