interface AvatarProps {
  size?: number;
  className?: string;
}

export default function Avatar({ size = 64, className }: AvatarProps) {
  return (
    <div
      className={className}
      style={{
        width: size, height: size, borderRadius: "50%",
        overflow: "hidden", flexShrink: 0,
        border: "3px solid rgba(255,255,255,0.8)",
        boxShadow: "0 4px 16px rgba(110,190,175,0.25)",
      }}
      aria-hidden="true"
    >
      <img
        src="/Assets/头像/youhuxiantiao.jpg"
        alt=""
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
    </div>
  );
}
