import { TextBox, TextBoxProps } from 'src/components/forms-controls/text-box';
import * as React from 'react';
import { decorate } from 'src/common/styles/styles-helper';
import { Theme } from 'src/common/styles/theme';
import { createStyles, Popper, Paper, MenuItem } from '@material-ui/core';
import { StyledComponentBase } from 'src/common/styles/types';
import * as Autosuggest from 'react-autosuggest';
import { SuggestionsFetchRequestedParams } from 'react-autosuggest';
import { match, parse } from 'src/common/autosuggest-highlight-helper';
import { createPropagationProps } from 'src/common/component-helper';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    suggestion: {
      display: 'block',
    },
    suggestionsList: {
      margin: 0,
      padding: 0,
      listStyleType: 'none',
    },
    popper: {},
    paper: {},
  });
interface Props {
  textBoxProps: TextBoxProps;
  value?: string;
  onChange?: (value: string) => void;
}
interface Events {
  getSuggestions?: (value?: string) => string[];
  getSuggestionsAsync?: (value?: string) => Promise<string[]>;
}
interface State {
  suggestions: string[];
  anchorEl?: HTMLElement;
}
class Inner extends StyledComponentBase<typeof styles, Props & Events, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      suggestions: [],
    };
  }
  private handleSuggestionsFetchRequested = async (
    param: SuggestionsFetchRequestedParams,
  ) => {
    const { value } = param;
    const { getSuggestions, getSuggestionsAsync } = this.props;
    const suggestions = getSuggestions
      ? getSuggestions(value)
      : getSuggestionsAsync
        ? await getSuggestionsAsync(value)
        : [];
    this.setState({ suggestions });
  };
  private handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };
  private setAnchorEl = (anchorEl?: HTMLElement) => {
    this.setState({ anchorEl });
  };
  public render() {
    const { textBoxProps, onChange, value, classes } = createPropagationProps(
      this.props,
    );
    const { anchorEl, suggestions } = this.state;
    return (
      <div className={classes.root}>
        <Autosuggest
          renderInputComponent={inputProps => {
            const { inputRef, ref, ...other } = inputProps;
            return (
              <TextBox
                {...textBoxProps}
                InputProps={{
                  inputRef: node => {
                    inputProps.ref(node);
                    inputProps.inputRef(node);
                  },
                }}
                {...other as any}
                fullWidth={true}
              />
            );
          }}
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
          getSuggestionValue={v => {
            return v;
          }}
          renderSuggestion={(v, { query, isHighlighted }) => {
            const matches = match(v, query);
            const parts = parse(v, matches);
            return (
              <MenuItem selected={isHighlighted} component="div">
                <div>
                  {parts.map((part, index) => {
                    return part.highlight ? (
                      <span key={String(index)} style={{ fontWeight: 500 }}>
                        {part.text}
                      </span>
                    ) : (
                      <strong key={String(index)} style={{ fontWeight: 300 }}>
                        {part.text}
                      </strong>
                    );
                  })}
                </div>
              </MenuItem>
            );
          }}
          inputProps={{
            classes,
            value: value ? value : '',
            onChange: (event, { newValue }) => {
              if (onChange) {
                onChange(newValue);
              }
            },
            inputRef: this.setAnchorEl,
          }}
          theme={{
            suggestionsList: classes.suggestionsList,
            suggestion: classes.suggestion,
          }}
          renderSuggestionsContainer={options => (
            <Popper
              anchorEl={anchorEl}
              open={Boolean(options.children)}
              className={classes.popper}
            >
              <Paper
                square={true}
                {...options.containerProps}
                style={{
                  width: anchorEl ? anchorEl.clientWidth : undefined,
                }}
                className={classes.paper}
              >
                {options.children}
              </Paper>
            </Popper>
          )}
        />
      </div>
    );
  }
}

export const Autocomplete = decorate(styles)(Inner);
