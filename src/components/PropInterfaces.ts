/*
  PropInterfaces.ts - type definitions for Component props
*/

import { Dispatch, FC, MouseEventHandler, SetStateAction } from "react";
import { ActiveMenuType, Image, MenuControls, Page, Post, Project } from "./Types";

// Props for Header, Footer
export interface SectionProps {
  model?: string,
  page: string,
  setFilter?: Dispatch<SetStateAction<string[]>>,
  setSearchValue?: Dispatch<SetStateAction<string>>,
};

export interface HeaderProps extends SectionProps {
  filter: string[],
  filterValue: string,
  inModelView?: boolean,
  isScrolled? : boolean,
  noMatches?: boolean,
  searchValue: string,
  setFilter: Dispatch<SetStateAction<string[]>>,
  setFilterValue: Dispatch<SetStateAction<string>>,
  setInModelView?: Dispatch<SetStateAction<boolean>>,
  setSearchValue: Dispatch<SetStateAction<string>>,
  setSortColumn: Dispatch<SetStateAction<string>>,
  sortColumn: string,
  usedCategories?: any[],
  usedTechnologies?: any[],
};

export interface HeaderIconProps {
  noMatches: boolean,
};

export interface NoMatchesMessageProps {
  modelName: string,
};

// Props for individual pages
export interface PageProps {
  // TODO: Make some of these 'any' arrays more specific
  filter: string[],
  inModelView?: boolean,
  model?: string,
  page?: string,
  pagePath?: string,
  posts?: any[],
  postCategories?: any[],
  postCategoriesLoaded?: boolean,
  postsLoaded?: boolean,
  projectTechnologies?: any[],
  projectTechnologiesLoaded?: boolean,
  projects?: any[],
  projectsLoaded?: boolean,
  searchValue?: string,
  setFilter: Dispatch<SetStateAction<string[]>>,
  setInModelView?: Dispatch<SetStateAction<boolean>>,
};

export interface StaticPageProps { 
  content: string,
  pagePath?: string,
  title: string,
}

export interface ModelProps {
  body: string,
  date: string,
  filter: string[],
  onBack?: () => void,
  searchValue?: string,
  setFilter: Dispatch<SetStateAction<string[]>>,
  title: string,
}

// Props for Posts on the Blog page
export interface PostProps extends ModelProps {
  categories?: any[],
  currentPost?: number | null,
  isStub?: boolean,
  onPostSelect?: (post_id: number) => void,
  postId: number,
  postRoute?: string,
};

export interface PostStubProps {
  body: string,
  date: string,
  postId: number,
  title: string,
};

export interface ProjectProps extends ModelProps{
  // TODO: flesh out this interface
  technologies?: any[],
  projectId: number,
};

export interface ProjectCardProps {
  deployed_url: string
  description: string,
  filter: string[],
  image_url: string,
  modified: string,
  projectRoute?: string,
  setFilter: Dispatch<SetStateAction<string[]>>,
  title: string,
  technologies: any[],
  techsFilter: string[]
};

export interface ModelTagProps {
  filterMatch: boolean,
  tag: string,
};

export interface FilterTagProps extends ModelTagProps {
  filter: string[],
  setFilter: Dispatch<SetStateAction<string[]>>,
}

export interface ModelTagContainerProps {
  filter: string[],
  model: "Post" | "Project",
  tags?: any[],
  setFilter: Dispatch<SetStateAction<string[]>>,
}


export interface ModelControlsProps {
  menuActive: ActiveMenuType,
  menuControls: MenuControls[],
  setMenuActive: Dispatch<SetStateAction<ActiveMenuType>>,
  // setMenuActive: (newMenu: ActiveMenuType) => void,
  setMenuControls: Dispatch<SetStateAction<MenuControls[]>>,
}

// Props for ModelControlsSort
export interface ModelControlsSortProps extends ModelControlsProps {
  sortColumn: string,
  setSortColumn: Dispatch<SetStateAction<string>>,
}

// Props for ModelControlsFilter
export interface ModelControlsFilterProps extends ModelControlsProps {
  filter: string[],
  filterValue: string,
  page: string,
  setFilter: Dispatch<SetStateAction<string[]>>,
  setFilterValue: Dispatch<SetStateAction<string>>,
  usedCategories?: any[],
  usedTechnologies?: any[],
}

// Props for ModelControlsSearch
export interface ModelControlsSearchProps extends ModelControlsProps {
  searchValue: string,
  setSearchValue: Dispatch<SetStateAction<string>>,
}

// Props for PrettyDate
export interface PrettyDateProps { 
  date: string,
  verb?: string,
};


// Props for main admin page
export interface AdminPageProps {
  fetchAllData: () => void,
}

// Props for AdminSideBar
export interface AdminSideBarProps {
  // activePage: string,
  adminRoutes?: {
    Component: FC<ModelAdminProps>,
    name: string,
    path: string,
  }[],
  borderChangeCallback: (newClass: string) => false | void,
  fetchAllData: () => void,
};

// Props for AdminEditor
export interface AdminEditorProps {
  className?: string,
  defaultValue?: string,
  emptyRequirement?: boolean,
  label: string,
  name: string,
  onChange?: (e: any) => void, // I might be doing this wrong
  placeholder: string,
  value?: string,
};

// Props for PageForm/ProjectForm/Post/Form
//  All Props are included and optional to allow for reuse
export interface AdminFormProps {
  backCallback: () => void,
};

// I don't like this too much, but I can't figure out a more concise way to 
// narrow the above types.
export interface AdminPageFormProps extends AdminFormProps {
  initialData: Page,
};

export interface AdminPostFormProps extends AdminFormProps {
  initialData: Post,
};

export interface AdminProjectFormProps extends AdminFormProps {
  initialData: Project,
};

export interface AdminImageFormProps extends AdminFormProps {
  initialData: Image,
};

// Props for AdminInput Components
export interface AdminInputProps {
  className?: string,
  emptyRequirement?: boolean,
  id: string,
  label?: string,
  onChange: (e: any) => void,
  // to manually change the value for clear buttons
  setValue?: Dispatch<SetStateAction<string>>,
  // specify a special label icon
  special?: "github" | "markdown" | "url" | "image",
  type?: "file" | "text",
  value: string,
};

// Props for AdminFormControls
export interface AdminFormControlsProps {
  backCallback: () => void,
  checkCallback: () => boolean,
  destination: string,
  emptyRequirement: boolean,
  model: string,
  submitCallback: (e: any) => void,
  verb: string,
};

// Props for AdminCard
export interface AdminCardProps {
  modelCount: number,
  modelName: string,
  modelRoute: string,
  // setLoaded: (loaded: boolean) => {}, 
};

// Props for AdminControls
export interface AdminControlsProps {
  filterOnChange: (e: any) => void,
  filterValue: string,
  modelName: string,
};

// Props for AdminDataLength 
export interface AdminDataLengthProps {
  dataLength: number,
  modelName: string,
};

// Props for AdminModelHeader
export interface AdminModelHeaderProps {
  modelName: string,
};

// Not necessarily a prop, but used for route parameters in forms
export interface AdminFormRouteParams {
  editId?: string,
  // editPrettyName?: string,
  editName?: string,
};

// Props for AdminLoading
export interface AdminLoadingProps {
  destination: string,
};

// Props for AdminCheckBox
export interface AdminCheckBoxProps {
  color?: string,  // do I actually need to use color?
  defaultValue?: boolean,
  id: string,
  label?: string,
  noMargin?: boolean,
  onChange?: (e: any) => void,
  value?: boolean,
};

// Props for AdminButtons that need a model name
export interface AdminButtonProps {
  disabled?: boolean,
  emptyFields?: boolean,
  modelName?: string,
  onClick?: MouseEventHandler<HTMLButtonElement>,
  path?: string, // probably don't need this 
  verb?: string,
};

// Props for AdminBackButton
export interface AdminBackButtonProps {
  backCallback: () => void,
  checkCallback?: () => boolean,
  destination?: string,
  log?: string,
  setLog?: (message: string) => void,
};

// Props for AdminSaveButton
export interface AdminSaveButtonProps {
  log?: string,
  setLog?: (message: string) => void,
  submitCallback?: (e: any) => void,
  verb: string,
};

// Props for AdminSearchBar
export interface AdminSearchBarProps {
  onChange: (e: any) => void,
  value: string,
};

// Props for AdminTableDeleteCell
export interface AdminTableDeleteCellProps {
  deletionKey: string,
  deletionRoute: string,
  deletionValue: string|number|boolean,
  successCallback: () => void,
};

// Props for AdminTableVisibleCell
export interface AdminTableVisibleCellProps {
  initialVisibility: boolean,
  // confusing - represents if the model field is inverted from what is
  //  selected in the UI - i.e. the UI says "Visible?" and the model field
  //  stores "hidden". Inverts the value on submission.
  invertedModel?: boolean, 
  primaryKey: string|number,
  toggleKey: string,
  toggleRoute: string,
};

// Props for AdminTablePreviewCell 
export interface AdminTablePreviewCellProps {
  path: string,
}

// Props for AdminTableTooltipCell
export interface AdminTableTooltipCellProps {
  cellContent: string,
  tooltipText: string,
};

// Props for AdminTagContainer
export interface AdminTagContainerProps {
  model: "Project" | "Post",
  modelId?: number,
  tagSet?: AdminTagProps[],
  // setTagSet?: (newSet: AdminTagProps[]) => {},
  setTagSet?: Dispatch<SetStateAction<AdminTagProps[] | undefined>>,
};

// Props for AdminTag
export interface AdminTagProps {
  className?: string,
  containingSet?: AdminTagProps[],
  setContainingSet?: Dispatch<SetStateAction<AdminTagProps[] | undefined>>,
  model?: "Project" | "Post",
  modelId?: number,
  name: string,
};

// Props for AdminTagInput
export interface AdminTagInputProps {
  allTags?: AdminTagProps[], // all tags in db for autocomplete
  currentTag: string,
  model: "Project" | "Post",
  modelId?: number,
  onSubmit?: () => {}, // TODO: What is the typing of this?
  refreshAllTags: () => void,
  setCurrentTag: Dispatch<SetStateAction<string>>,
  setTagSet?: Dispatch<SetStateAction<AdminTagProps[] | undefined>>, 
  setVisible: (isVisible: boolean) => void,
  tagSet?: AdminTagProps[], // the set attached to the current model
  visible: boolean,
};

// Props for PageAdmin, PostAdmin, ProjectAdmin, etc
export interface ModelAdminProps {
  borderChangeCallback?: (newClass: string) => void,
};