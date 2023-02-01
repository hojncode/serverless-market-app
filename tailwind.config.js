/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js.jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class", // class 로 다크 모드를 적용 시 ->dark 를 dark modifier를 쓰는 요소의 부모 요소에 넣어야 한다.
  //darkMode: "media" 는 사용자의 브라우저 다크 모드 설정 유무에 따라간다.,
  // 또는 next.js이기 때문에 _app 컴포넌트 (최상위) 에 <div className="dark"></div> 로 사용할 수도 있다.
  plugins: [require("@tailwindcss/forms")],
};
