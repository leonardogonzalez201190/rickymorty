import type { ComponentType, LazyExoticComponent } from "react";

// Character types: Defines the shape of the Rick and Morty character data
export type RMCharacter = {
  id?: number;
  name?: string;
  status?: string;
  species?: string;
  type?: string;
  gender?: string;
  image?: string;
  origin?: {
    name?: string;
    url?: string;
  }
}

export type CardProps = RMCharacter & {
  onClick?: () => void;
  variant?: "list" | "details";
  isLoading?: boolean;
};

export type RMApiInfo = {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export type RMApiResponse = {
  info: RMApiInfo;
  results: RMCharacter[];
}

export type UseRMListState = {
  characters: RMCharacter[];
  info: RMApiInfo | null;
  loading: boolean;
  error: string | null;
  page: number;
  setPage: (page: number) => void;
  reload: () => void;
}

export type CharacterCardProps = {
  character: RMCharacter;
  isLoading?: boolean;
  onClick?: () => void;
}

export type SortOrder = "asc" | "desc" | "none";

export type OrderControlProps = {
  sortOrder: SortOrder;
  onChange: (nextOrder: SortOrder) => void;
}

export type RMListData = {
  results: RMCharacter[];
  info: RMApiInfo | null;
}




export type RoutesMap = {
  [path: string]: ComponentType<any> | LazyExoticComponent<any>;
}