/** Logo vettoriale originale AL.SIL. (da assets/logo.svg del sito precedente). */
export const LOGO_VIEWBOX = "232.00 442.24 643.36 193.00";
export const LOGO_PATHS: [string, string][] = [
  ["matrix(1,0,0,-1,304.4918,498.27717)", "M0 0-5.008-35.058H76.045L81.053 0ZM-47.411 54.03H141.702L118.465-135.083H64.436L70.683-81.053H-10.371L-16.618-135.083H-70.647L-47.411 54.03Z"],
  ["matrix(1,0,0,-1,456.0509,444.24757)", "M0 0H54.03L37.412-135.083H172.495L165.876-189.113H-23.236L0 0Z"],
  ["matrix(1,0,0,-1,691.5834,579.3305)", "M0 0-6.619-54.03H-60.648L-54.03 0Z"],
  ["matrix(1,0,0,-1,644.6503,444.24757)", "M0 0-4.371-35.642H-93.459L-94.521-44.544H-5.433L-15.326-124.73H-140.038L-135.667-89.088H-46.579L-45.517-80.186H-134.605L-124.712 0H0Z"],
  ["matrix(1,0,0,-1,694.0079,568.9599)", "M0 0-54.437 .071-39.111 124.783 15.326 124.712 0 0Z"],
  ["matrix(1,0,0,-1,718.3593,444.24757)", "M0 0 44.774 .071 27.643-135.047 95.937-135.118 89.53-189.113H-23.52L0 0Z"],
  ["matrix(1,0,0,-1,873.4842,579.3305)", "M0 0-4.937-53.835-58.454-54.03-51.994 0H.018Z"],
];

export default function LogoSvg({ className = "logo", title = "AL.SIL." }: { className?: string; title?: string }) {
  return (
    <svg className={className} viewBox={LOGO_VIEWBOX} xmlns="http://www.w3.org/2000/svg" role="img" aria-label={title}>
      {LOGO_PATHS.map(([t, d]) => (
        <path key={d} transform={t} d={d} fill="currentColor" />
      ))}
    </svg>
  );
}
