import {defineConfig} from 'vite';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: 'src/botconversaChat.ts',
      formats: ['es'],
      fileName: 'botconversaChat',
    },
  },
  plugins: [
    dts({
      insertTypesEntry: true,
    }),
  ],
});
