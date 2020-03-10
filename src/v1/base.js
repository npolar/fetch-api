//@todo non-production
const isProduction = (/* url */) => true;
const url = document && document.URL ? document.URL : "";
const prefix = isProduction(url) ? "api" : "api-test.data";
export default `https://${prefix}.npolar.no`;
