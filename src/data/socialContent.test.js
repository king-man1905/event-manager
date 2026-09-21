import { describe, it, expect } from 'vitest';
import { socialContent } from './socialContent';

describe('socialContent', () => {
  it('has exactly 5 verified video entries', () => {
    expect(socialContent).toHaveLength(5);
  });

  it('each entry has a valid shape and verified-video status', () => {
    socialContent.forEach((item) => {
      expect(item.platform).toBe('youtube');
      expect(item.type).toBe('video');
      expect(typeof item.videoId).toBe('string');
      expect(item.videoId.length).toBeGreaterThan(0);
      expect(typeof item.label).toBe('string');
      expect(item.verificationStatus).toBe('verified-video');
      expect(item.sourceUrl).toBe(`https://www.youtube.com/shorts/${item.videoId}`);
      expect(item.id).toBe(`yt-${item.videoId}`);
    });
  });

  it('references exactly the 5 verified real video ids, and no others', () => {
    const ids = socialContent.map((item) => item.videoId).sort();
    expect(ids).toEqual(
      ['8Ll1q_CRLRA', 'BLlOtkPXf9E', 'H7EhkKuHGWU', 'a-siuy_wkx0', 'z-PeklpQUdI'].sort()
    );
  });
});
