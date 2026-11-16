interface LatinTextProps {
  text: string;
}

export default function LatinText({ text }: LatinTextProps) {
  return (
    <>
      {text.split(/([A-Za-z]+)/).map((part, index) =>
        index % 2 === 1 ? (
          <span key={index} className="font-literacy">
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
}
