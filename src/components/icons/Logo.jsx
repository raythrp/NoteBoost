const Logo = () => {
  return (
    <div className="w-[95px] h-[95px] relative logo-shadow">
      <svg width="95" height="95" viewBox="0 0 95 95" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Background */}
        <rect x="15.62" y="7.81" width="68.44" height="84.07" fill="#4795C2" />
        <rect x="15.62" y="7.81" width="68.44" height="84.07" fill="#215273" />

        {/* White Paper */}
        <rect x="7.81" y="3.12" width="71.88" height="84.38" fill="#FDFEFF" stroke="rgba(0, 0, 0, 0.25)" />

        {/* Text Lines */}
        <rect x="23.41" y="25" width="40.68" height="3.12" fill="#215273" />
        <rect x="23.37" y="37.5" width="39.75" height="3.12" fill="#215273" />
        <rect x="23.41" y="50" width="26.59" height="3.12" fill="#215273" />
        <rect x="23.41" y="62.5" width="18.78" height="3.12" fill="#215273" />

        {/* Decorative Shapes */}
        <rect x="62.5" y="3.12" width="17.19" height="17.19" fill="#D6E8F2" />
        <rect x="79.69" y="32.03" width="9.37" height="21.2" fill="#004787" />
        <rect x="61.17" y="39.41" width="18.52" height="25.43" fill="#DFEAEF" />
        <rect x="83.81" y="28.91" width="10.17" height="10.17" fill="#4795C2" />
        <rect x="83.81" y="28.91" width="8.06" height="4.41" fill="#357BA4" />

        {/* Rotated Elements */}
        <rect x="63.07" y="52.9" width="26.07" height="3.25" transform="rotate(-45 63.07 52.9)" fill="#4795C2" />
        <rect x="65.38" y="55.21" width="26.06" height="3.25" transform="rotate(-45 65.38 55.21)" fill="#7EC2DD" />
        <rect x="63.07" y="52.9" width="26.07" height="3.25" transform="rotate(-45 63.07 52.9)" fill="#4795C2" />
        <rect x="81.5" y="34.47" width="10.89" height="9.77" transform="rotate(-45 81.5 34.47)" fill="#DFEAEF" />
        <rect x="81.5" y="31.01" width="8.07" height="10.77" fill="#C3D6DD" />

        {/* Accent Colors */}
        <rect x="61.92" y="52.9" width="8.06" height="8.07" fill="#F7D694" />
        <rect x="61.17" y="58.66" width="3.05" height="3.06" fill="#215273" />
      </svg>
    </div>
  );
};

export default Logo;
