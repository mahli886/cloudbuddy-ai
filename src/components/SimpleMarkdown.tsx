import { type ReactNode } from 'react';

// A lightweight markdown renderer for chat messages.
// Supports: headings (##, ###), bold (**text**), bullet lists (•), and paragraphs.
// This avoids adding a heavy markdown library dependency.

function renderInline(text: string): ReactNode[] {
  // Split by **bold** markers
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-semibold text-navy-900">
          {part.slice(2, -2)}
        </strong>
      );
    }
    // Handle italic _text_
    const italicParts = part.split(/(_[^_]+_)/g);
    if (italicParts.length > 1) {
      return italicParts.map((ip, j) => {
        if (ip.startsWith('_') && ip.endsWith('_')) {
          return (
            <em key={`${i}-${j}`} className="text-navy-500 italic">
              {ip.slice(1, -1)}
            </em>
          );
        }
        return <span key={`${i}-${j}`}>{ip}</span>;
      });
    }
    return <span key={i}>{part}</span>;
  });
}

export function SimpleMarkdown({ content }: { content: string }) {
  const lines = content.split('\n');
  const elements: ReactNode[] = [];
  let listItems: string[] = [];

  function flushList(key: number) {
    if (listItems.length === 0) return;
    elements.push(
      <ul key={`list-${key}`} className="space-y-1.5 my-3 pl-1">
        {listItems.map((item, i) => (
          <li key={i} className="flex gap-2 text-navy-700 leading-relaxed">
            <span className="text-sky-500 mt-1 shrink-0">•</span>
            <span>{renderInline(item)}</span>
          </li>
        ))}
      </ul>,
    );
    listItems = [];
  }

  lines.forEach((line, idx) => {
    const trimmed = line.trim();

    if (trimmed === '') {
      flushList(idx);
      return;
    }

    if (trimmed.startsWith('## ')) {
      flushList(idx);
      elements.push(
        <h2 key={idx} className="text-lg font-bold text-navy-900 mt-4 mb-2 font-display">
          {trimmed.slice(3)}
        </h2>,
      );
      return;
    }

    if (trimmed.startsWith('### ')) {
      flushList(idx);
      elements.push(
        <h3 key={idx} className="text-sm font-semibold text-sky-700 mt-3 mb-1.5 uppercase tracking-wide">
          {trimmed.slice(4)}
        </h3>,
      );
      return;
    }

    if (trimmed.startsWith('• ')) {
      listItems.push(trimmed.slice(2));
      return;
    }

    flushList(idx);
    elements.push(
      <p key={idx} className="text-navy-700 leading-relaxed my-2">
        {renderInline(trimmed)}
      </p>,
    );
  });

  flushList(lines.length);

  return <div className="text-sm">{elements}</div>;
}
