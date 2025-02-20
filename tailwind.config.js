module.exports = {
  content: [
    "./src/**/*.{js, jsx, ts, tsx}",
    "./src/**/*.{css, scss,sass}"
  ],
  theme: {
    extend: {
      colors: {
        customGray: '#ccc',
        bgColor: '#FAF3E0',
        bgGreen: '#4CAF50',
        bgRed: '#F44336',
        errorBg: '#E49A9A',
        errorBorder: '#F64F4F',
        textColor: '#333333',
        grayLight: '#F4F2F2',
        textBlue: '#5650FF',
        icon: '#C3C3C6',
        textGray: '#97979B',
        primary: '#6534FF',
        success: '#A0F095',
        danger: '#FF4F58',
        secondary: '#E8F5E9',
        lightGray: '#F7F7F8',
        cardShadow: 'rgba(0, 0, 0, 0.1)',
        white: '#FFFFFF',
        black: '#000000',
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
      fontSize: {
        base: '16px',
        icon: '25px',
      },
      boxShadow: {
        cardShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      },
      animation: {
        fliker: 'fliker 1s infinite',
      },
      keyframes: {
        fliker: {
          '0%': {
            backgroundColor: '#f3f3f6',
          },
          '50%': {
            backgroundColor: '#fafafa',
          },
          '100%': {
            backgroundColor: '#f3f3f6',
          },
        },
      },
    },
  },
  plugins: [],
}


