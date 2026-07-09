import { useNavbarController } from './NavbarController';
import { NavbarView } from './NavbarView';

interface NavbarProps {
  onAdminClick?: () => void;
}

export default function Navbar({ onAdminClick }: NavbarProps) {
  const controller = useNavbarController(onAdminClick);

  return <NavbarView {...controller} />;
}
