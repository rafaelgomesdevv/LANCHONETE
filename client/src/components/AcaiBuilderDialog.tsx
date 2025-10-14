import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import AcaiBuilder from './AcaiBuilder';

interface AcaiBuilderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AcaiBuilderDialog({ open, onOpenChange }: AcaiBuilderDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] md:max-w-5xl max-h-[90vh] overflow-y-auto" data-testid="dialog-acai-builder">
        <DialogHeader className="border-b pb-3 md:pb-4">
          <DialogTitle className="text-lg md:text-2xl font-bold" data-testid="text-acai-builder-title">
            Monte Seu Açaí
          </DialogTitle>
          <DialogDescription className="text-xs md:text-sm" data-testid="text-acai-builder-description">
            Personalize seu açaí do jeito que você gosta
          </DialogDescription>
        </DialogHeader>
        
        <AcaiBuilder />
      </DialogContent>
    </Dialog>
  );
}
