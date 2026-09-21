import { useEffect } from 'react';

export function usePageMeta(metaOrTitle, maybeDescription) {
  const { title, description } =
    typeof metaOrTitle === 'object' && metaOrTitle !== null
      ? metaOrTitle
      : { title: metaOrTitle, description: maybeDescription };

  useEffect(() => {
    if (!title && !description) return;

    const previousTitle = document.title;
    if (title) {
      document.title = title;
    }

    let meta = document.querySelector('meta[name="description"]');
    const createdMeta = !meta;
    if (!meta && description) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    const previousDescription = meta ? meta.getAttribute('content') : null;
    if (meta && description) {
      meta.setAttribute('content', description);
    }

    return () => {
      document.title = previousTitle;
      if (createdMeta && meta) {
        meta.remove();
      } else if (meta && previousDescription !== null) {
        meta.setAttribute('content', previousDescription);
      }
    };
  }, [title, description]);
}
