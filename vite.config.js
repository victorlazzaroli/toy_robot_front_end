import { defineConfig } from 'vite';

export default defineConfig({
    test: {
        environment: 'jsdom',
        coverage: {
            reporter: ['text', 'json', 'html'],
        }
    }
});
