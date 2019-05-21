export = index;
declare class index {
  static MODES: {
    MOUNT: string;
    SHALLOW: string;
    STRING: string;
  };
  createElement(...args: any[]): any;
  createMountRenderer(options: any): any;
  createRenderer(options: any): any;
  createShallowRenderer(...args: any[]): any;
  createStringRenderer(options: any): any;
  displayNameOfNode(node: any): any;
  elementToNode(element: any): any;
  getProviderFromConsumer(Consumer: any): any;
  invokeSetStateCallback(instance: any, callback: any): void;
  isContextConsumer(type: any): any;
  isCustomComponent(type: any): any;
  isCustomComponentElement(inst: any): any;
  isFragment(fragment: any): any;
  isValidElement(element: any): any;
  isValidElementType(object: any): any;
  nodeToElement(node: any): any;
  nodeToHostNode(node: any, ...args: any[]): any;
  wrap(element: any): any;
  wrapWithWrappingComponent(node: any, options: any): any;
}
