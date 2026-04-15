import { getSettings } from '@/lib/queries';
import Navbar from './Navbar';

export default async function NavbarServer() {
  const settings = await getSettings();

  return (
    <Navbar
      logoUrl={settings?.logo?.asset.url}
      logoAlt={settings?.logo?.alt}
      logoWidth={settings?.logoWidth ?? 140}
      logoHeight={settings?.logoHeight ?? 40}
    />
  );
}
