import { flushPromises, mount } from '@vue/test-utils';
import { ref } from 'vue';
import {
    expect,
    it,
    describe,
    vi,
    beforeEach,
} from '../../../../../../tests/drivers/vitest/utils';

import * as breakpointComposable from '../../../composables/breakpoint';
import * as Navigation from '../../../navigation/Navigation';

import BaseModal from '../BaseModal.vue';

describe('BaseModal', () => {
    describe('position of modal', () => {
        beforeEach(() => {
            Navigation.isNavColumnExtended.value = false;
        });
        it('should set the position if the screen is small and navbar is not shown', () => {
            vi.spyOn(breakpointComposable, 'useBreakpoint')
                .mockImplementation((breakpoint:string, mode: 'min' | 'max' = 'min') => {
                    if (breakpoint === breakpointComposable.BREAKPOINTS.md && mode === 'max') {
                        return ref(true);
                    }
                    return ref(false);
                });
            mount(BaseModal, {
                props: {
                    show: true,
                },
            });
            const container = document.body.querySelector('.BaseModalContainer') as HTMLElement | null;
            expect(container).not.toBe(null);
            expect(container?.style.getPropertyValue('left')).toStrictEqual('');
            expect(container?.style.getPropertyValue('max-width')).toStrictEqual('');
        });
        it('should set position for four-xl screen', () => {
            vi.spyOn(breakpointComposable, 'useBreakpoint')
                .mockImplementation((breakpoint:string, mode: 'min' | 'max' = 'min') => {
                    if (breakpoint === breakpointComposable.BREAKPOINTS['4xl'] && mode === 'min') {
                        return ref(true);
                    }
                    return ref(false);
                });
            mount(BaseModal, {
                props: {
                    show: true,
                },
            });
            const container = document.body.querySelector('.BaseModalContainer') as HTMLElement | null;
            expect(container).not.toBe(null);
            const leftVal = Navigation.LEFT_NAVBAR_WIDTH + Navigation.RIGHT_NAVBAR_EXPANDED_WIDTH;
            expect(container?.style.getPropertyValue('left')).toStrictEqual(`${leftVal}px`);
            expect(container?.style.getPropertyValue('max-width')).toStrictEqual(`calc(100% - ${leftVal}px)`);
        });
        it('should set position for an expanded navbar', () => {
            vi.spyOn(breakpointComposable, 'useBreakpoint')
                .mockImplementation(() => ref(false));
            Navigation.isNavColumnExtended.value = true;
            mount(BaseModal, {
                props: {
                    show: true,
                },
            });
            const container = document.body.querySelector('.BaseModalContainer') as HTMLElement | null;
            expect(container).not.toBe(null);
            const leftVal = Navigation.LEFT_NAVBAR_WIDTH + Navigation.RIGHT_NAVBAR_EXPANDED_WIDTH;
            expect(container?.style.getPropertyValue('left')).toStrictEqual(`${leftVal}px`);
            expect(container?.style.getPropertyValue('max-width')).toStrictEqual(`calc(100% - ${leftVal}px)`);
        });
        it('should set position for a collapsed navbar', () => {
            vi.spyOn(breakpointComposable, 'useBreakpoint')
                .mockImplementation(() => ref(false));
            mount(BaseModal, {
                props: {
                    show: true,
                },
            });
            const container = document.body.querySelector('.BaseModalContainer') as HTMLElement | null;
            expect(container).not.toBe(null);
            const leftVal = Navigation.LEFT_NAVBAR_WIDTH + Navigation.RIGHT_NAVBAR_COLLAPSED_WIDTH;
            expect(container?.style.getPropertyValue('left')).toStrictEqual(`${leftVal}px`);
            expect(container?.style.getPropertyValue('max-width')).toStrictEqual(`calc(100% - ${leftVal}px)`);
        });
    });
    describe('hiding and showing modal', () => {
        it('should hide and show modal based on property "show"', async () => {
            const wrapper = mount(BaseModal, {
                props: {
                    show: false,
                },
                slots: {
                    default: '<span class="unitTestContent">CONTENT</span>',
                },
            });
            // container should be in DOM, content should not
            let container = document.body.querySelector('.BaseModalContainer') as HTMLElement | null;
            let content = document.body.querySelector('.unitTestContent') as HTMLElement | null;
            expect(container).not.toBe(null);
            expect(container?.classList.contains('BaseModalContainerHidden')).toBe(true);
            expect(content).toBe(null);

            // set show to true
            wrapper.setProps({
                show: true,
            });
            await flushPromises();
            container = document.body.querySelector('.BaseModalContainer') as HTMLElement | null;
            content = document.body.querySelector('.unitTestContent') as HTMLElement | null;
            expect(container).not.toBe(null);
            expect(container?.classList.contains('BaseModalContainerHidden')).toBe(false);
            expect(content).not.toBe(null);

            // set show to false and check if event is emitted
            wrapper.setProps({
                show: false,
            });
            await flushPromises();
            container = document.body.querySelector('.BaseModalContainer') as HTMLElement | null;
            content = document.body.querySelector('.unitTestContent') as HTMLElement | null;
            expect(container).not.toBe(null);
            expect(container?.classList.contains('BaseModalContainerHidden')).toBe(true);
            expect(content).toBe(null);
            expect(wrapper.emitted().close.length).toBe(1);
        });
        it('should close the modal when clicking on close button', async () => {
            const wrapper = mount(BaseModal, {
                props: {
                    show: true,
                },
                slots: {
                    default: '<span class="unitTestContent">CONTENT</span>',
                },
            });
            let container = document.body.querySelector('.BaseModalContainer') as HTMLElement | null;
            let content = document.body.querySelector('.unitTestContent') as HTMLElement | null;
            expect(container).not.toBe(null);
            expect(container?.classList.contains('BaseModalContainerHidden')).toBe(false);
            expect(content).not.toBe(null);

            const closeButton = document.body.querySelector('.BaseModalCloseButton') as HTMLElement | null;
            expect(closeButton).not.toBe(null);
            closeButton?.click();
            await flushPromises();

            expect(wrapper.emitted().close.length).toBe(1);
            container = document.body.querySelector('.BaseModalContainer') as HTMLElement | null;
            content = document.body.querySelector('.unitTestContent') as HTMLElement | null;
            expect(container).not.toBe(null);
            expect(container?.classList.contains('BaseModalContainerHidden')).toBe(true);
            expect(content).toBe(null);
        });
    });
    describe.each([[false], [true]])('displaying a modal', (fullScreen) => {
        it(`where 'fullScreen' is '${fullScreen}'`, () => {
            mount(BaseModal, {
                props: {
                    fullScreen,
                    show: true,
                },
                slots: {
                    default: '<span class="unitTestContent">CONTENT</span>',
                },
            });
            const container = document.querySelector('.BaseModalContainer') as HTMLElement | null;
            expect(container).not.toBe(null);
            expect(container?.classList.contains('BaseModalContainerHidden')).toBe(false);
            expect(container?.classList.contains('top-[10vh]')).toBe(!fullScreen);
            expect(container?.classList.contains('bottom-[10vh]')).toBe(!fullScreen);
            expect(container?.classList.contains('overflow-y-auto')).toBe(!fullScreen);
            expect(container?.classList.contains('h-full')).toBe(fullScreen);

            const modal = document.querySelector('.BaseModalElement') as HTMLElement | null;
            expect(modal).not.toBe(null);
            expect(modal?.classList.contains('pb-[80px]')).toBe(!fullScreen);
            expect(modal?.classList.contains('overflow-hidden')).toBe(!fullScreen);
            expect(modal?.classList.contains('bg-white')).toBe(!fullScreen);
            expect(modal?.classList.contains('md:w-[46rem]')).toBe(!fullScreen);
            expect(modal?.classList.contains('rounded')).toBe(!fullScreen);
            expect(modal?.classList.contains('overflow-y-auto')).toBe(fullScreen);
            expect(modal?.classList.contains('w-full')).toBe(fullScreen);
        });
    });
    describe.each([[false], [true]])('show and hide closebutton', (showCloseButton) => {
        it(`where 'showCloseButton' is '${showCloseButton}'`, () => {
            mount(BaseModal, {
                props: {
                    showCloseButton,
                    show: true,
                },
                slots: {
                    default: '<span class="unitTestContent">CONTENT</span>',
                },
            });
            const container = document.querySelector('.BaseModalContainer') as HTMLElement | null;
            expect(container).not.toBe(null);
            expect(container?.classList.contains('BaseModalContainerHidden')).toBe(false);
            const closeButton = document.querySelector('.BaseModalCloseButton') as HTMLElement | null;
            expect(closeButton === null).toBe(!showCloseButton);
        });
    });
});
