import { flushPromises } from '@vue/test-utils';
import {
    expect,
    it,
    describe,
    render,
    screen,
    user,
} from '../../../../../../tests/drivers/vitest/utils';
import { useFilter } from '../../../../shared/composables/filter';
import ApplicantFilterExactSearch from '../ApplicantFilterExactSearch.vue';

const {
    filter: filterOptions,
} = useFilter();

describe.each([
    [false, '', '', false],
    [true, '', '', false],
    [false, 'Keyword', '"Keyword"', false],
    [true, '"Keyword"', 'Keyword', false],
    [false, '"Keyword"', '"Keyword"', false],
    [true, 'Keyword', 'Keyword', false],
    [false, 'Keyword with "spaces" inside', '"Keyword with spaces inside"', false],
    [true, '"Keyword with "spaces" inside"', 'Keyword with spaces inside', false],
    [false, '', '', true],
    [true, '', '', true],
    [false, 'Keyword', '"Keyword"', true],
    [true, '"Keyword"', 'Keyword', true],
    [false, '"Keyword"', '"Keyword"', true],
    [true, 'Keyword', 'Keyword', true],
    [false, 'Keyword with "spaces" inside', '"Keyword with spaces inside"', true],
    [true, '"Keyword with "spaces" inside"', 'Keyword with spaces inside', true],
])('ApplicantFilterExactSearch', (initExactSearch, currKeyword, keywordAfterToggle, useKeyboard) => {
    it(`it should set the current keyword when the toggle button is triggered, where the button is initially 
    ${initExactSearch ? 'toggled' : 'not toggled'} and the current keyword is '${currKeyword}'`, async () => {
        filterOptions.value.exactSearch = initExactSearch;
        filterOptions.value.keyword = currKeyword;
        render(ApplicantFilterExactSearch);
        if (useKeyboard) {
            const toggle = await screen.findByTestId('BaseToggleButton toggle');
            toggle.focus();
            user.keyboard(' ');
        } else {
            const toggleInput = await screen.findByTestId('BaseToggleButton input');
            await user.click(toggleInput);
        }
        await flushPromises();
        expect(filterOptions.value.exactSearch).toBe(!initExactSearch);
        expect(filterOptions.value.keyword).toStrictEqual(keywordAfterToggle);
    });
});
