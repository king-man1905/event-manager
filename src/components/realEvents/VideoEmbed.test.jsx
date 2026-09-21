import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import VideoEmbed from './VideoEmbed';

describe('VideoEmbed', () => {
  it('renders a real thumbnail and a play button, with no iframe, before being clicked', () => {
    render(<VideoEmbed videoId="a-siuy_wkx0" label="Event Highlight Reel" />);
    expect(screen.getByRole('img', { name: 'Event Highlight Reel' })).toHaveAttribute(
      'src',
      'https://i.ytimg.com/vi/a-siuy_wkx0/hqdefault.jpg'
    );
    expect(screen.getByRole('button', { name: 'Play Event Highlight Reel' })).toBeInTheDocument();
    expect(document.querySelector('iframe')).not.toBeInTheDocument();
  });

  it('mounts a real iframe with the correct video and title only after the play button is clicked', () => {
    render(<VideoEmbed videoId="H7EhkKuHGWU" label="Wedding Décor Reel" />);
    fireEvent.click(screen.getByRole('button', { name: 'Play Wedding Décor Reel' }));
    const iframe = document.querySelector('iframe');
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute('src', 'https://www.youtube.com/embed/H7EhkKuHGWU?autoplay=1');
    expect(iframe).toHaveAttribute('title', 'Wedding Décor Reel');
    expect(screen.queryByRole('button', { name: /Play/i })).not.toBeInTheDocument();
  });
});
