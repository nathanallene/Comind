import type { Block } from "@/lib/content";

export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="prose">
      {blocks.map((block, index) => {
        if (block.type === "h2") return <h2 key={index}>{block.text}</h2>;
        if (block.type === "ul") {
          return (
            <ul key={index}>
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          );
        }
        if (block.type === "note") {
          return (
            <p key={index} className="note">
              {block.text}
            </p>
          );
        }
        return <p key={index}>{block.text}</p>;
      })}
    </div>
  );
}
