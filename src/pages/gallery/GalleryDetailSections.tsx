import { Check, Hammer } from 'lucide-react';
import type { ComponentType } from 'react';
import { DisplayHeading, Eyebrow } from '../../components/ui';
import type { GalleryCategory, GalleryLabels } from '../../types';

interface GalleryDetailSectionsProps {
  category: GalleryCategory;
  labels: GalleryLabels;
}

interface IconListProps {
  Icon: ComponentType<{ className?: string }>;
  items: string[];
}

function IconList({ Icon, items }: IconListProps) {
  return (
    <ul className="ui-icon-grid" style={{ gridTemplateColumns: '1fr', listStyle: 'none', margin: 0, padding: 0 }}>
      {items.map((item, idx) => (
        <li key={idx} className="ui-icon-item">
          <Icon className="ui-icon-item__icon" aria-hidden />
          <div>
            <p className="ui-icon-item__title">{item}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export function GalleryDetailSections({ category, labels }: GalleryDetailSectionsProps) {
  const advantages = category.advantages || category.features;
  const services = category.services || category.options;

  if (!advantages && !services) {
    return null;
  }

  return (
    <div className="detail-pair-grid">
      {advantages ? (
        <section className="detail-pair-section" aria-labelledby="advantages-heading">
          <header>
            <Eyebrow>{labels.advantages}</Eyebrow>
            <DisplayHeading level={3} id="advantages-heading">
              {labels.advantages}
            </DisplayHeading>
          </header>
          <IconList Icon={Check} items={advantages} />
        </section>
      ) : null}

      {services ? (
        <section className="detail-pair-section" aria-labelledby="services-heading">
          <header>
            <Eyebrow>{labels.services}</Eyebrow>
            <DisplayHeading level={3} id="services-heading">
              {labels.services}
            </DisplayHeading>
          </header>
          <IconList Icon={Hammer} items={services} />
        </section>
      ) : null}
    </div>
  );
}
