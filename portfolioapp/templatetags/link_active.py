from django import template

register = template.Library()

@register.filter
def bold(name, url):
    '''Returns stronger font weight class if name and url match'''
    if name == url:
        return 'fw5'
    else:
        return ''
