import { ref } from 'vue';

import { flushPromises } from '@vue/test-utils';
import {
    expect, it, mockEndpoint, render, screen, beforeEach, vi, user, describe, type SpyInstance,
    afterEach,
} from '../../../tests/drivers/vitest/utils';

import * as search from '../../packages/applicant/__test__/preconditions/search';
import * as filter from '../../packages/applicant/__test__/preconditions/filter';
import * as breakpointComposable from '../../packages/shared/composables/breakpoint';
import { useLang } from '../../packages/shared/composables/i18n';
import type { FilterLabel, UserInfo } from '../../packages/shared/types/applicant/types';
import { isNavColumnExtended } from '../../packages/shared/navigation/Navigation';
import * as UserInfoService from '../../packages/shared/composables/user-info';
import * as FilterService from '../../packages/applicant/repositories/filter-repository';

import LayoutDefault from './LayoutDefault.vue';

vi.doMock('../../packages/shared/composables/breakpoint.ts');

const { lang } = useLang();

const mockUserInfoData: UserInfo = {
    customerType: 'Unternehmen',
    firstName: 'Max',
    lastName: 'Mustermann',
    initials: 'MM',
    profilePictureUrl: null,
    company: {
        id: 1,
        name: 'Test Company',
        address: 'Test Address 1, 4020 Linz',
    },
};
let mockGetUserInfo: SpyInstance<[], Promise<UserInfo | null>> | null = null;
let mockValidateLocation: SpyInstance<[location: string], Promise<{
    data: {
        valid: boolean;
    } | never[];
    error: {
        name: string;
        level: string;
        status: number;
    } | null;
}>> | null = null;
let mockGetAllFilterLabels: SpyInstance<[lang: string], Promise<{
    data: FilterLabel[],
    error: {
        name: string;
        level: string;
        status: number;
    } | null;
}>> | null = null;
beforeEach(() => {
    isNavColumnExtended.value = false;
    mockGetUserInfo = vi.spyOn(UserInfoService, 'getUserInfo')
        .mockImplementation(() => Promise.resolve(mockUserInfoData));
    mockValidateLocation = vi.spyOn(FilterService, 'validateLocation')
        .mockImplementation(() => Promise.resolve({ data: { valid: true }, error: null }));
    mockGetAllFilterLabels = vi.spyOn(FilterService, 'getAllFilterLabels')
        .mockImplementation(() => Promise.resolve({ data: [], error: null }));
});
afterEach(() => {
    if (mockGetUserInfo) {
        mockGetUserInfo.mockRestore();
    }
    if (mockValidateLocation) {
        mockValidateLocation.mockRestore();
    }
    if (mockGetAllFilterLabels) {
        mockGetAllFilterLabels.mockRestore();
    }
    UserInfoService.userInfo.value = null;
});

describe('NavigationDrawer', () => {
    beforeEach(() => {
        vi.spyOn(window.screen, 'width', 'get').mockReturnValue(1500);
        vi.spyOn(breakpointComposable, 'useBreakpoint').mockReturnValue(ref(true));

        search.hasResults({ mockEndpoint });
        filter.hasFilterLabels({ mockEndpoint });
        render(LayoutDefault);
    });
    it('should be shown when 2xl screen size', async () => {
        await screen.findByTestId('NavigationDrawer');
    });
    it('should be able to switch language', async () => {
        const searchbar = await screen.findByTestId('ApplicantSearchField');
        await user.click(searchbar);
        expect(lang.value).toStrictEqual('de');
        await user.click(await screen.findByRole('button', {
            name: 'DE',
        }));
        await user.click(await screen.findByTestId('li EN'));
        expect(lang.value).toStrictEqual('en');
        await user.click(await screen.findByTestId('li DE'));
        expect(lang.value).toStrictEqual('de');
    });
});
describe('Backdrop', () => {
    it('should toggle the navigation backdrop whenever the navigation drawer emits activateBackdrop', async () => {
        const mockUseBreakpoint = vi.spyOn(breakpointComposable, 'useBreakpoint')
            .mockImplementation((bp, mode) => {
                if (bp === breakpointComposable.BREAKPOINTS.md) {
                    return ref(mode !== 'max');
                }
                return ref(false);
            });
        render(LayoutDefault);
        await screen.findByTestId('NavigationDrawer');
        await user.click(await screen.findByTestId('NavRightColumnNavItem-1'));
        await screen.findByTestId('BaseBackdrop');
        await user.click(await screen.findByTestId('NavRightColumnNavItem-1'));
        await flushPromises();
        const backdrop = screen.queryByTestId('BaseBackdrop');
        expect(backdrop).toBe(null);
        mockUseBreakpoint.mockRestore();
    });
    it('should toggle the backdrop and the navigation drawer when clicking on the burger menu on mobile', async () => {
        const mockUseBreakpoint = vi.spyOn(breakpointComposable, 'useBreakpoint')
            .mockImplementation(() => ref(false));
        render(LayoutDefault);
        const burgerIcon = await screen.findByTestId('NavBurgerIcon');
        let navigationDrawer = screen.queryByTestId('NavigationDrawer');
        expect(navigationDrawer).toBe(null);
        let backDrop = screen.queryByTestId('BaseBackdrop');
        expect(backDrop).toBe(null);
        await user.click(burgerIcon);
        await screen.findByTestId('NavigationDrawer');
        backDrop = await screen.getByTestId('BaseBackdrop');
        await user.click(backDrop);
        await flushPromises();
        navigationDrawer = screen.queryByTestId('NavigationDrawer');
        expect(navigationDrawer).toBe(null);
        backDrop = screen.queryByTestId('BaseBackdrop');
        expect(backDrop).toBe(null);
        mockUseBreakpoint.mockRestore();
    });
});
