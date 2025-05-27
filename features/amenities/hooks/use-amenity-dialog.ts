import createDialogStore from "@/hooks/use-dialog";
import { Aminity } from "@/features/amenities/components/columns";

const useAmenityDialog = createDialogStore<Aminity>();

export default useAmenityDialog;
