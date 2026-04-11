import { TestimonialSlider } from '@/components/ui/testimonial-slider';
import styles from './Testimonials.module.css';

export default function Testimonials() {
  return (
    <section className="w-full mt-16 py-16 overflow-hidden" style={{ backgroundColor: '#f7f7f5' }}>
      <TestimonialSlider trackClassName={styles.track} />
    </section>
  );
}
