import type { defineComponent } from 'vue';
import type { ComponentType } from '../../types/componentType';
import { componentMap } from '@/components/Table/src/componentMap';

import { h } from 'vue';

export interface ComponentProps {
  component: ComponentType;
  rule: boolean;
  popoverVisible: boolean;
  ruleMessage: string;
  getPopupContainer?: Fn;
}

export const CellComponent = (
  {
    component = 'Input',
    rule = true,
    ruleMessage,
    popoverVisible,
    getPopupContainer,
  }: ComponentProps,
  { attrs },
) => {
  const Comp = componentMap.get(component) as typeof defineComponent;

  const DefaultComp = h(Comp, attrs);
  if (!rule || !popoverVisible) {
    return DefaultComp;
  }
  const errorAttrs = rule
    ? {
        ...attrs,
        status: rule ? 'error' : null,
        'error-message': ruleMessage,
      }
    : attrs;

  return h(Comp, errorAttrs);
};
