const customMaxMediaQuery = (maxWidth: number) =>
  `@media (max-width: ${maxWidth}px)`;
const customMinMediaQuery = (minWidth: number) =>
  `@media (min-width: ${minWidth + 1}px)`;
  
/* methods are on media and can use them instead of raw queries */
const media = {
  custom: customMaxMediaQuery,
  desktop: customMinMediaQuery(1440),
  notDesktop: customMaxMediaQuery(1440),
  tablet: customMaxMediaQuery(768),
  phone: customMaxMediaQuery(576),
  notPhone: customMinMediaQuery(576),
  smallPhone: customMaxMediaQuery(380),
}

export default media
