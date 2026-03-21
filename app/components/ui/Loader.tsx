export default function Loader({ text = "Loading..." }: { text?: string }) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        <style>{`
          @keyframes before8 {
            0%   { width: 0.5em; box-shadow: 1em -0.5em rgba(99,102,241,0.8), -1em 0.5em rgba(139,92,246,0.8); }
            35%  { width: 2.5em; box-shadow: 0 -0.5em rgba(99,102,241,0.8), 0 0.5em rgba(139,92,246,0.8); }
            70%  { width: 0.5em; box-shadow: -1em -0.5em rgba(99,102,241,0.8), 1em 0.5em rgba(139,92,246,0.8); }
            100% { box-shadow: 1em -0.5em rgba(99,102,241,0.8), -1em 0.5em rgba(139,92,246,0.8); }
          }
          @keyframes after6 {
            0%   { height: 0.5em; box-shadow: 0.5em 1em rgba(79,70,229,0.8), -0.5em -1em rgba(167,139,250,0.8); }
            35%  { height: 2.5em; box-shadow: 0.5em 0 rgba(79,70,229,0.8), -0.5em 0 rgba(167,139,250,0.8); }
            70%  { height: 0.5em; box-shadow: 0.5em -1em rgba(79,70,229,0.8), -0.5em 1em rgba(167,139,250,0.8); }
            100% { box-shadow: 0.5em 1em rgba(79,70,229,0.8), -0.5em -1em rgba(167,139,250,0.8); }
          }
          .ev-loader { position: relative; width: 2.5em; height: 2.5em; transform: rotate(165deg); }
          .ev-loader:before, .ev-loader:after { content: ""; position: absolute; top: 50%; left: 50%; display: block; width: 0.5em; height: 0.5em; border-radius: 0.25em; transform: translate(-50%, -50%); }
          .ev-loader:before { animation: before8 2s infinite; }
          .ev-loader:after  { animation: after6  2s infinite; }
        `}</style>
        <div className="relative w-16 h-16"><div className="ev-loader" /></div>
        <p className="text-xs text-gray-400">{text}</p>
      </div>
    </div>
  );
}