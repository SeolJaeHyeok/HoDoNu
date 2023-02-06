import { modalFamilyState } from '@atoms/modalAtom';
import { useRecoilState } from 'recoil';

export default function useModal(modalId: string) {
  const [isOpen, setIsOpen] = useRecoilState(modalFamilyState(modalId));

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return { isOpen, setIsOpen, openModal, closeModal };
}
