import { IWanderlistItem } from "@/interfaces/IWanderlist";
import { JSX } from "react";

interface WanderlistDetailClientProps {
  wanderlistData: IWanderlistItem;
}

declare function WanderlistDetailClient(props: WanderlistDetailClientProps): JSX.Element;

export default WanderlistDetailClient;
