function GradientBackground(props: { children: any }) {
  return (
    <div className="h-full bg-gradient-to-br from-yellow-100 via-pink-100 to-indigo-100 flex flex-col items-center justify-center p-6">
      {props.children}
    </div>
  );
}

export default GradientBackground;
