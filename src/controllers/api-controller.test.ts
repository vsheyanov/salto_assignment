import apiController from './api-controller';
import { ErrorResponse, RepositoryObject, SearchRepoResponse } from "../model/interfaces";

test('should request repositories list', async () => {
    const repos = await apiController.searchRepos('test');
    const errorResponse = (repos as ErrorResponse);
    const dataResponse = (repos as SearchRepoResponse);
    expect(errorResponse.message).toEqual(undefined);
    expect(dataResponse.result.items.length).not.toEqual(0);
});

test('should return empty list when entered non existing repo name', async () => {
    const repos = await apiController.searchRepos('this-repository-doesnt-not-existSDLKFJLKSDFJ#@(*&@(*#$&');
    const errorResponse = (repos as ErrorResponse);
    const dataResponse = (repos as SearchRepoResponse);
    expect(errorResponse.message).toEqual(undefined);
    expect(dataResponse.result.items.length).toEqual(0);
});

test('should request info about repository', async () => {
    const repo = await apiController.getRepository('facebook', 'react');
    const errorResponse = (repo as ErrorResponse);
    const dataResponse = (repo as RepositoryObject);
    expect(errorResponse.message).toEqual(undefined);
    expect(dataResponse).toBeInstanceOf(Object);
    expect(dataResponse.result.full_name).toEqual('facebook/react');
});

test('should return error if repository does not exist', async () => {
    const repo = await apiController.getRepository('facebook', 'this-repository-doesnt-not-exist');
    const errorResponse = (repo as ErrorResponse);
    const dataResponse = (repo as RepositoryObject);
    expect(errorResponse.message).toEqual('Not Found');
    expect(dataResponse.result).toEqual(undefined);
});

test('should request readme from a repository', async () => {
    const readme = await apiController.getRepositoryReadme('facebook', 'react');
    expect(readme).not.toEqual('');
    expect(readme.length).not.toEqual(0);
});

test('should return empty string for non existent repository', async () => {
    const readme = await apiController.getRepositoryReadme('facebook', 'this-repository-doesnt-not-exist');
    expect(readme).toEqual('');
});