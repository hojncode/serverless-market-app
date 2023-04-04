/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // domains: ["imagedelivery.net", "videodelivery.net", "cloudflarestream.com"],
  remotePatterns: [
    {
      protocol: "https",
      hostname: "imagedelivery.net/",
      port: "",
      pathname: "",
    },
  ],

  // async headers() {
  //   return [
  //     {
  //       // matching all API routes
  //       source: "/api/:path*",
  //       headers: [
  //         { key: "Access-Control-Allow-Credentials", value: "true" },
  //         { key: "Access-Control-Allow-Origin", value: "*" },
  //         {
  //           key: "Access-Control-Allow-Methods",
  //           value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
  //         },
  //         {
  //           key: "Access-Control-Allow-Headers",
  //           value:
  //             "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
  //         },
  //         // {
  //         //   key: "X-Content-Type-Options",
  //         //   value:"",
  //         // },
  //       ],
  //     },
  //   ];
  // },
  async headers() {
    return [
      // if the header `x-add-header` is present,
      // the `x-another-header` header will be applied
      // {
      //   source: "/api/:path*",
      //   has: [
      //     {
      //       type: "header",
      //       key: "x-add-header",
      //     },
      //   ],
      //   headers: [
      //     {
      //       key: "x-another-header",
      //       value: "hello",
      //     },
      //   ],
      // },
      // // if the header `x-no-header` is not present,
      // // the `x-another-header` header will be applied
      // {
      //   source: "/api/:path*",
      //   missing: [
      //     {
      //       type: "header",
      //       key: "x-no-header",
      //     },
      //   ],
      //   headers: [
      //     {
      //       key: "x-another-header",
      //       value: "hello",
      //     },
      //   ],
      // },
      // // if the source, query, and cookie are matched,
      // // the `x-authorized` header will be applied
      {
        source: "/api/:path*",
        has: [
          {
            type: "query",
            key: "page",
            // the page value will not be available in the
            // header key/values since value is provided and
            // doesn't use a named capture group e.g. (?<page>home)
            value: "home",
          },
          {
            type: "cookie",
            key: "authorized",
            value: "true",
          },
        ],
        headers: [
          {
            key: "x-authorized",
            value: ":authorized",
          },
        ],
      },
      // // if the header `x-authorized` is present and
      // // contains a matching value, the `x-another-header` will be applied
      // {
      //   source: "/api/:path*",
      //   has: [
      //     {
      //       type: "header",
      //       key: "x-authorized",
      //       value: "(?<authorized>yes|true)",
      //     },
      //   ],
      //   headers: [
      //     {
      //       key: "x-another-header",
      //       value: ":authorized",
      //     },
      //   ],
      // },
      // // if the host is `example.com`,
      // // this header will be applied
      // {
      //   source: "/api/:path*",
      //   has: [
      //     {
      //       type: "host",
      //       value: "example.com",
      //     },
      //   ],
      //   headers: [
      //     {
      //       key: "x-another-header",
      //       value: ":authorized",
      //     },
      //   ],
      // },
      {
        //         // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "*",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;

// // next.config.js
// module.exports = {
//   async headers() {
//     return [
//       {
//         // matching all API routes
//         source: "/api/:path*",
//         headers: [
//           { key: "Access-Control-Allow-Credentials", value: "true" },
//           { key: "Access-Control-Allow-Origin", value: "*" },
//           { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
//           { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
//         ]
//       }
//     ]
//   }
// };
